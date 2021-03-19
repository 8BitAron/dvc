import {
  Container,
  createStyles,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";

export default function App() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");
  const [resort, setResort] = useState("");

  const resorts = [
    "Animal Kingdom",
    "Bay Lake Tower",
    "Aulani Resort",
    "Beach Club Villas",
    "Boardwalk Villas",
    "Copper Creek",
    "Grand Californian Hotel & Spa",
    "Old Key West",
    "Saratoga Springs",
    "Vero Beach",
    "Boulder Ridge Villas",
    "Polynesian Villas and Bungalows",
    "Hilton Head",
    "Riviera Resort",
  ];

  const useYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetch("http://localhost:5150/listing", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => res.json())
      .then((json) => {
        setList(json);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel>Resorts</InputLabel>
            <Select
              label="Resorts"
              value={resort}
              onChange={(e) => setResort(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {resorts.map((resort) => (
                <MenuItem value={resort}>{resort}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel>Use Year</InputLabel>
            <Select
              label="Use Year"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {useYear.map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <List>
            {list
              .filter((r) => {
                if (!resort) {
                  return true;
                }
                return r.resort.split("-")[0].trim() === resort;
              })
              .filter((l) => {
                if (!filter) {
                  return true;
                }
                return l.useYear.trim() === filter;
              })
              .map((listing, i) => {
                console.log("listing", listing);
                return (
                  <ListItem>
                    <ListItemText
                      primary={listing.resort.split("-")[0].trim()}
                      secondary={
                        <>
                          <Typography component="span" variant="subtitle1">
                            {listing.useYear}
                          </Typography>
                          {" | "}
                          <Typography component="span" variant="body1">
                            {listing.price}
                          </Typography>
                          {" | "}
                          <Typography component="span" variant="body1">
                            {listing.points}
                          </Typography>
                          <Divider />
                          <Typography component="p" variant="body2">
                            {listing.description}
                          </Typography>
                          <Typography component="p">
                            {new Date(listing.updatedAt).toDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>
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
