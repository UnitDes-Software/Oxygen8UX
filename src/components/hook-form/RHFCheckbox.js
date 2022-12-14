import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
};

export function RHFCheckbox({ name, defaultChecked, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} defaultChecked={defaultChecked} />}
        />
      }
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(onSelected(option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

RHFControlCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export function RHFControlCheckbox({ name, checked, onChange, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={checked} onChange={(e) => onChange(e)} />}
        />
      }
      {...other}
    />
  );
}
