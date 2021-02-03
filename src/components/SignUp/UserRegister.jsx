import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect, useRef, useState } from 'react';
import useDataUser from '../../hooks/useDataUser';
import { userSchema, userSchemaGlobal } from './YupSchema';
import Item from './Item';
import DisabledButton from '../../hooks/useDisabledButton';

export default function UserRegister() {
  const [dataUser, setDataUser] = useState({});
  const userRef = useRef();
  const { newUser, setNewUser } = useDataUser();
  const { disableButton, ableButton } = DisabledButton();

  useEffect(() => {
    setDataUser(newUser);
  }, [newUser]);

  useEffect(() => {
    userRef.current = dataUser;
  }, [dataUser]);

  useEffect(() => {
    const verifyWholeObject = async () => {
      const isSchemaValid = await userSchemaGlobal.isValid(dataUser);

      if (!isSchemaValid) {
        disableButton();
      } else {
        ableButton();
      }
    };

    verifyWholeObject();
  }, [dataUser]);

  useEffect(() => {
    return () => {
      setNewUser(userRef.current);
    };
  }, []);

  const items = [
    {
      id: 'name',
      name: 'nom',
      label: 'Nom',
      stateKey: 'lastname',
      value: dataUser.lastname,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: userSchema.lastname,
      helperText: 'Saisissez votre nom de famille',
    },
    {
      id: 'firstname',
      name: 'firtname',
      label: 'Prénom',
      stateKey: 'firstname',
      value: dataUser.firstname,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: userSchema.firstname,
      helperText: 'Saisissez votre prénom',
    },
    {
      id: 'mail',
      name: 'mail',
      label: 'Adresse e-mail',
      stateKey: 'email',
      value: dataUser.email,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: userSchema.email,
      helperText: 'Saisissez votre adresse email',
    },
    {
      id: 'tel',
      name: 'tel',
      label: 'Numéro de téléphone',
      stateKey: 'phone_number',
      value: dataUser.phone_number,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: userSchema.phone_number,
      helperText: 'Saisissez votre numero de telephone au format "+33 6...."',
    },
    {
      id: 'mdp',
      name: 'mdp',
      label: 'Mot de passe',
      stateKey: 'password',
      value: dataUser.password,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: userSchema.password,
      helperText:
        'Au moins : 8 caractères, 1 caractère spécial, 1 chiffre, 1 majuscule',
    },
    {
      id: 'poste',
      name: 'poste',
      label: 'Intitulé du poste occupé',
      stateKey: 'job_title',
      value: dataUser.job_title,
      xs: 12,
      sm: 6,
      autoComplete: 'given-name',
      schema: userSchema.job_title,
      helperText: 'Saisissez votre emploi',
    },
  ];
  const [errorLang, setErrorLang] = useState(false);
  const [errorConf, setErrorConf] = useState(false);
  const handleBlurConf = () => {
    setErrorConf(dataUser.password !== dataUser.password2);
  };
  const handleBlurLang = async () => {
    const isValid = await userSchema.language.isValid(dataUser.language);
    setErrorLang(!isValid);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Informations administrateur
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
            handleChange={setDataUser}
          />
        ))}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="confirmation"
            label="Confirmer mot de passe"
            onChange={(e) =>
              setDataUser({ ...dataUser, password2: e.target.value })
            }
            fullWidth
            autoComplete="cc-exp"
            onBlur={handleBlurConf}
            error={errorConf}
            helperText={
              errorConf
                ? 'Les mots de passe ne correspondent pas '
                : 'Confirmer votre mot de passe'
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Langue"
            select
            label="Langue"
            onChange={(e) =>
              setDataUser({ ...dataUser, language: e.target.value })
            }
            fullWidth
            autoComplete="cc-exp"
            onBlur={handleBlurLang}
            error={errorLang}
            helperText="Selectionner votre langue"
          >
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="English">English</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </>
  );
}
