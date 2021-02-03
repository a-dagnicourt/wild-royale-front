import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useEffect, useRef, useState } from 'react';
import { MenuItem } from '@material-ui/core';
import Item from './Item';
import useDataCompany from '../../hooks/useDataCompany';
import { CompanySchema, CompanySchemaGlobal } from './YupSchema';
import DisabledButton from '../../hooks/useDisabledButton';

function AddressCompany() {
  const [dataChange, setDataChange] = useState({});
  const dataRef = useRef();
  const { newData, setNewData } = useDataCompany();
  const { disableButton, ableButton } = DisabledButton();

  useEffect(() => {
    setDataChange(newData);
  }, [newData]);

  useEffect(() => {
    const verifyWholeObject = async () => {
      const isSchemaValid = await CompanySchemaGlobal.isValid(dataChange);

      if (!isSchemaValid) {
        disableButton();
      } else {
        ableButton();
      }
    };

    verifyWholeObject();
  }, [dataChange]);

  useEffect(() => {
    dataRef.current = dataChange;
  }, [dataChange]);

  useEffect(() => {
    return () => {
      setNewData(dataRef.current);
    };
  }, []);

  const items = [
    {
      id: 'name-company',
      name: 'company',
      label: "Nom de l'entreprise",
      stateKey: 'label',
      value: dataChange.label,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: CompanySchema.label,
      helperText: 'Saisissez le nom de votre entreprise',
    },
    {
      id: 'Siret-number',
      name: 'Siret-Number',
      label: 'Numéro de SIRET',
      stateKey: 'SIRET_number',
      value: dataChange.SIRET_number,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: CompanySchema.SIRET_number,
      helperText: 'Saisissez votre n°de SIRET / 14 chiffres',
    },
    {
      id: 'street',
      name: 'street',
      label: 'Nom de la rue',
      stateKey: 'street',
      value: dataChange.street,
      xs: 12,
      sm: undefined,
      autoComplete: 'given-name',
      schema: CompanySchema.street,
      helperText: 'Saisissez votre adresse',
    },
    {
      id: 'city',
      name: 'city',
      label: 'Ville',
      stateKey: 'city',
      value: dataChange.city,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: CompanySchema.city,
      helperText: 'Saisissez votre ville',
    },
    {
      id: 'vat-number',
      name: 'vat-number',
      label: 'Numero VAT',
      stateKey: 'VAT_number',
      value: dataChange.VAT_number,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: CompanySchema.VAT_number,
      helperText: 'Saisissez votre numero VAT / 11 chiffres',
    },
    {
      id: 'zip',
      name: 'zip',
      label: 'Code Postal',
      stateKey: 'zip_code',
      value: dataChange.zip_code,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      helperText: 'Saisissez votre numero code postal / 5 chiffres',
      schema: CompanySchema.zip_code,
    },
  ];
  const [isError, setIsError] = useState(false);
  const handleBlur = async () => {
    const isValid = await CompanySchema.country.isValid(dataChange.country);
    setIsError(!isValid);
  };
  return (
    <div style={{ border: '1px solid white' }}>
      <Typography style={{ color: 'black' }} variant="h6" gutterBottom>
        Informations entreprise
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Item
            id={item.id}
            name={item.name}
            label={item.label}
            stateKey={item.stateKey}
            value={item.value}
            xs={item.xs}
            sm={item.sm}
            autoComplete={item.autoComplete}
            helperText={item.helperText}
            schema={item.schema}
            handleChange={setDataChange}
          />
        ))}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            select
            name="country"
            label="Pays"
            value={dataChange.country}
            onChange={(e) =>
              setDataChange({ ...dataChange, country: e.target.value })
            }
            fullWidth
            autoComplete="cc-exp"
            helperText="Selectionnez votre pays"
            onBlur={handleBlur}
            error={isError}
          >
            <MenuItem value="FR">France</MenuItem>
            <MenuItem value="EN">United-kingdom</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddressCompany;
