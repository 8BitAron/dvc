import {
  Button,
  Container,
  createStyles,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
} from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ListingRow } from './components/Listing/ListingRow';

export default function App() {
  const classes = useStyles();
  const {
    getAccessTokenSilently,
    loginWithRedirect,
    isAuthenticated,
    logout,
    user,
    isLoading,
  } = useAuth0();
  const [list, setList] = useState([]);
  const [sources, setSources] = useState([]);
  const [resorts, setResorts] = useState([]);
  const [filter, setFilter] = useState('');
  const [resort, setResort] = useState('');
  const [source, setSource] = useState('');
  const [pointsRange, setPointsRange] = useState([0, 2000]);
  const [pending, setPending] = useState<boolean>(false);

  const useYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handlePointRangeChange = (event: any, newValue: any) => {
    setPointsRange(newValue);
  };

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        console.log(token);
        fetch('http://localhost:5150/listing', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
          .catch((error) => {
            console.log(error);
          })
          .then((res: any) => res.json())
          .then((json) => {
            setList(json);
          });
      }
    })();

    fetch('http://localhost:5150/source', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res: any) => res.json())
      .then((json) => {
        setSources(json);
      });

    fetch('http://localhost:5150/resort', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res: any) => res.json())
      .then((json) => {
        setResorts(json);
      });
  }, [isAuthenticated]);

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 75,
      label: '75',
    },
    {
      value: 150,
      label: '150',
    },
    {
      value: 200,
      label: '200',
    },
    {
      value: 500,
      label: '500',
    },
    {
      value: 1000,
      label: '1000',
    },
    {
      value: 2000,
      label: '2000',
    },
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel>Resorts</InputLabel>
            <Select
              label="Resorts"
              value={resort}
              onChange={(e: any) => setResort(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {resorts.map((resort: any) => (
                <MenuItem key={resort.id} value={resort.id}>
                  {resort.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel>Use Year</InputLabel>
            <Select
              label="Use Year"
              value={filter}
              onChange={(e: any) => setFilter(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {useYear.map((year: any) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel>Sites</InputLabel>
            <Select
              label="Sites"
              value={source}
              onChange={(e: any) => setSource(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {sources.slice(0, 3).map((source: any) => (
                <MenuItem key={source.id} value={source.id}>
                  {source.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={pending}
                onChange={() => setPending(!pending)}
                name="pending"
                color="primary"
              />
            }
            label="pending"
          />
        </Grid>
        <Grid item style={{ flex: 1 }}></Grid>
        {isAuthenticated ? (
          <>
            <Grid item>
              <Typography>Welcome Home, {user.name}</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item>
            <Button variant="contained" onClick={() => loginWithRedirect()}>
              Log In
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <Typography gutterBottom>Points Range</Typography>
            <Slider
              value={pointsRange}
              min={0}
              max={2000}
              onChange={handlePointRangeChange}
              step={25}
              marks={marks}
              valueLabelDisplay="on"
            />
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          {list.length > 0 &&
            list
              .filter((sp: any) => {
                if (pending) {
                  return true;
                }
                return sp.price !== 'Sale pending';
              })
              .filter((r: any) => {
                if (!resort) {
                  return true;
                }
                return r.resort.id === resort;
              })
              .filter((s: any) => {
                if (!source) {
                  return true;
                }
                return s.source.id === source;
              })
              .filter((l: any) => {
                if (!filter) {
                  return true;
                }
                return l.useYear.trim() === filter;
              })
              .filter((l: any) => {
                if (!pointsRange) {
                  return true;
                }
                return l.points >= pointsRange[0] && l.points <= pointsRange[1];
              })
              .map((listing: any, i: number) => {
                return <ListingRow key={i} {...listing} />;
              })}
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
