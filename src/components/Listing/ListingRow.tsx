import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import { FC } from 'react';

interface ListingRowProps {
  id: string;
  name: string;
  useYear: string;
  price: string;
  points: string;
  description: string;
  updatedAt: Date;
}

export const ListingRow: FC<ListingRowProps> = (props) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{props.points}</Avatar>}
        title={props.name}
        subheader={`${props.useYear} | $${props.price}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="span">
          {props.description}
        </Typography>
        <Typography component="span" variant="caption">
          {new Date(props.updatedAt).toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};
