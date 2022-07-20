import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// export const DatePickerField = ({ ...props }:any) => {
//     const { setFieldValue } = useFormikContext();
//     const [field] = useField(props);
    
//     const handleDateChangeRaw = (e:any) => {
//       e.preventDefault();
//     };
//     return (
//       <DatePicker
//         className='picker'
//         {...field}
//         {...props}
//         autoComplete='off'
//         onChangeRaw={handleDateChangeRaw}
//         dateFormat={window?.dateformat}
//         selected={(field.value && new Date(field.value)) || null}
//         onChange={(val:any) => {
//           val.setHours(val.getHours() + 1);
//           setFieldValue(field.name, val);
//         }}
//         // customInput={<DatePickerFieldType />}
//       />
//     );
//   };

export const DatePickerField = ({ ...props }:any) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      utcOffset={0}
      autoComplete='off'
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val:any) => {
        let AdjusteddateValue= (new Date(val.getTime() - (val.getTimezoneOffset() * 60000)));
        setFieldValue(field.name, AdjusteddateValue);
      }}
    />
  );
};
  