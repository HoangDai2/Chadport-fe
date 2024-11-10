declare module "emoji-mart" {
  import * as React from "react";

  interface PickerProps {
    onSelect: (emoji: any) => void;
    set?: "apple" | "google" | "twitter" | "facebook";
    title?: string;
    emoji?: string;
  }

  export class Picker extends React.Component<PickerProps, any> {}
}
