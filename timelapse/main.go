package main

import (
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"image/color/palette"
	"image/draw"
	"image/gif"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"sync"
	"time"
)

func readDir(path string) ([]os.DirEntry, error) {
	files, err := os.ReadDir(path)
	if err != nil {
		return nil, err
	}

	sort.Slice(files, func(i, j int) bool {
		return files[i].Name() < files[j].Name()
	})

	return files, nil
}

func readFile(path string, file os.DirEntry) ([][]string, error) {
	if file.IsDir() {
		return nil, fmt.Errorf("cannot read directory")
	}

	content, err := os.ReadFile(filepath.Join(path, file.Name()))
	if err != nil {
		return nil, fmt.Errorf("error reading file: %w", err)
	}

	var data [][]string
	err = json.Unmarshal(content, &data)
	if err != nil {
		return nil, fmt.Errorf("error decoding JSON: %w", err)
	}

	return data, nil
}

func getPath() (string, int64) {
	execPath, err := os.Executable()
	if err != nil {
		panic(err)
	}

	path := filepath.Dir(execPath)
	var miliseconds int64 = 20
	if len(os.Args) > 1 {
		path = filepath.Join(path, os.Args[1])
		miliseconds, _ = strconv.ParseInt(os.Args[2], 10, 64)
	}

	return path, miliseconds
}

func hexToColor(hex string) color.RGBA {
	if hex[0] == '#' {
		hex = hex[1:]
	}

	r, _ := strconv.ParseUint(hex[0:2], 16, 8)
	g, _ := strconv.ParseUint(hex[2:4], 16, 8)
	b, _ := strconv.ParseUint(hex[4:6], 16, 8)

	return color.RGBA{uint8(r), uint8(g), uint8(b), 255}
}

func rgbaToPaletted(img *image.RGBA) *image.Paletted {
	bounds := img.Bounds()
	palettedImg := image.NewPaletted(bounds, palette.WebSafe)
	draw.Draw(palettedImg, bounds, img, bounds.Min, draw.Src)
	return palettedImg
}

func createGIF(images []*image.RGBA, outputPath string, delay int) error {
	var frames []*image.Paletted = make([]*image.Paletted, len(images))
	var delays = make([]int, len(images))
	var wg sync.WaitGroup

	for index, img := range images {
		wg.Add(1)
		go func(img *image.RGBA, index int) {
			defer wg.Done()
			palettedImg := rgbaToPaletted(img)
			frames[index] = palettedImg
			delays[index] = delay
		}(img, index)
	}

	wg.Wait()

	f, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer f.Close()

	anim := gif.GIF{
		Image: frames,
		Delay: delays,
	}

	return gif.EncodeAll(f, &anim)
}

const (
	CELL_SIZE  = 10
	IMAGE_SIZE = 100 * CELL_SIZE
)

func main() {
	stepStart := time.Now()
	fmt.Println("Start time:", stepStart)

	path, miliseconds := getPath()

	files, err := readDir(path)
	if err != nil {
		fmt.Println("Error reading files:", err)
		return
	}

	stepDuration := time.Since(stepStart)
	fmt.Println("Time to get path:", stepDuration)

	var images []*image.RGBA = make([]*image.RGBA, len(files))
	var wg sync.WaitGroup

	for index, file := range files {
		wg.Add(1)

		go func(file os.DirEntry, index int) {
			defer wg.Done()

			img := image.NewRGBA(image.Rect(0, 0, IMAGE_SIZE, IMAGE_SIZE))

			dataFile, err := readFile(path, file)
			if err != nil {
				fmt.Println("Error reading file:", err)
				return
			}

			for j, row := range dataFile {
				for i, cell := range row {
					color := hexToColor(cell)
					rect := image.Rect(i*CELL_SIZE, j*CELL_SIZE, (i+1)*CELL_SIZE, (j+1)*CELL_SIZE)
					draw.Draw(img, rect, &image.Uniform{C: color}, image.Point{}, draw.Src)
				}
			}

			images[index] = img
		}(file, index)
	}

	wg.Wait()

	fmt.Println("Time to process images:", time.Since(stepStart))

	stepStartAfter := time.Now()
	err = createGIF(images, "output.gif", int(miliseconds))
	if err != nil {
		fmt.Println("Error creating GIF:", err)
	}

	fmt.Println("Time to create GIF:", time.Since(stepStartAfter))
}
