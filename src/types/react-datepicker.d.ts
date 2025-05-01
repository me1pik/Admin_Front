// src/types/react-datepicker.d.ts
declare module 'react-datepicker' {
  import React from 'react';
  export interface ReactDatePickerProps {
    selected?: Date;
    onChange?: (date: Date | [Date, Date] | null, event?: any) => void;
    dateFormat?: string;
  }
  const ReactDatePicker: React.ComponentType<ReactDatePickerProps>;
  export default ReactDatePicker;
}
