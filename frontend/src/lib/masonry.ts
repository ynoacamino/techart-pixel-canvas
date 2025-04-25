export type MasonryProps = React.HTMLAttributes<HTMLElement> & {
  gap?: string;
  maxcolwidth?: string;
};

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'masonry-layout': MasonryProps & React.DOMAttributes<HTMLElement>;
      }
    }
  }
}
