import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useDataCompany from '../../hooks/useDataCompany';
import useDataUser from '../../hooks/useDataUser';
import ReviewItem from './ReviewItem';

function Review() {
  const { newData } = useDataCompany();
  const { newUser } = useDataUser();

  const CompanyItems = [
    {
      id: 'name-company',
      name: 'company',
      label: "Nom de l'entreprise",
      value: newData.label,
      xs: 12,
      sm: 6,
    },
    {
      id: 'Siret-number',
      name: 'Siret-Number',
      label: 'Numéro de SIRET',
      value: newData.SIRET_number,
      xs: 12,
      sm: 6,
    },
    {
      id: 'street',
      name: 'street',
      label: 'Nom de la rue',
      value: newData.street,
      xs: 12,
      sm: undefined,
    },
    {
      id: 'city',
      name: 'city',
      label: 'Ville',
      value: newData.city,
      xs: 12,
      sm: 6,
    },
    {
      id: 'vat-number',
      name: 'vat-number',
      label: 'Numero VAT',
      value: newData.VAT_number,
      xs: 12,
      sm: 6,
    },
    {
      id: 'zip',
      name: 'zip',
      label: 'Code Postal',
      value: newData.zip_code,
      xs: 12,
      sm: 6,
    },
    {
      id: 'country',
      name: 'country',
      label: 'Pays',
      value: newData.country,
      xs: 12,
      sm: 6,
    },
  ];
  const UserItems = [
    {
      id: 'name',
      name: 'nom',
      label: 'Nom',
      value: newUser.lastname,
      xs: 12,
      sm: 6,
    },
    {
      id: 'firstname',
      name: 'firtname',
      label: 'Prénom',
      value: newUser.firstname,
      xs: 12,
      sm: 6,
    },
    {
      id: 'mail',
      name: 'mail',
      label: 'Adresse e-mail',
      stateKey: 'email',
      value: newUser.email,
      xs: 12,
      sm: 6,
    },
    {
      id: 'tel',
      name: 'tel',
      label: 'Numéro de téléphone',
      value: newUser.phone_number,
      xs: 12,
      sm: 6,
    },
    {
      id: 'poste',
      name: 'poste',
      label: 'Intitulé du poste occupé',
      value: newUser.job_title,
      xs: 12,
      sm: 6,
    },
    {
      id: 'Langue',
      name: 'Langue',
      label: "Langue de l'utilisateur",
      value: newUser.language,
      xs: 12,
      sm: 6,
    },
  ];
  return (
    <div>
      <Grid container spacing={3}>
        {CompanyItems.map((item) => (
          <ReviewItem
            id={item.id}
            name={item.name}
            label={item.label}
            value={item.value}
            xs={item.xs}
            sm={item.sm}
          />
        ))}
        <Grid item xs={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Utilisateur :
          </Typography>
        </Grid>
        {UserItems.map((item) => (
          <ReviewItem
            id={item.id}
            name={item.name}
            label={item.label}
            value={item.value}
            xs={item.xs}
            sm={item.sm}
          />
        ))}
      </Grid>
    </div>
  );
}
export default Review;
