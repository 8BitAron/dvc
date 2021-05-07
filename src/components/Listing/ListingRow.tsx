import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import { FC } from 'react';

interface ListingRowProps {
  id: string;
  dvcId: string;
  name: string;
  useYear: string;
  price: string;
  points: string;
  description: string;
  updatedAt: Date;
  source: any;
  link: string;
  resort: any;
}

export const ListingRow: FC<ListingRowProps> = (props) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{props.points}</Avatar>}
        title={props.resort.name}
        subheader={`${props.useYear} | $${props.price}`}
      />
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="span">
              {props.description}
            </Typography>
            <Typography component="span" variant="caption">
              {new Date(props.updatedAt).toDateString()}
            </Typography>
          </Grid>
          <Grid item>
            {props.link && (
              <Button
                color="primary"
                variant="outlined"
                target="_new"
                href={props.link}
              >
                listing
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
