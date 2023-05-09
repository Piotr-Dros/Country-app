import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Region } from '../utils/api';

type RegionObject = {
  region: Region;
  label: string;
};

const regions: RegionObject[] = [
  {
    region: 'africa',
    label: 'Africa',
  },
  {
    region: 'america',
    label: 'America',
  },
  {
    region: 'europe',
    label: 'Europe',
  },
  {
    region: 'asia',
    label: 'Asia',
  },
  {
    region: 'oceania',
    label: 'Oceania',
  },
];

const SelectRegion = ({
  onChange,
}: {
  onChange: (e: SelectChangeEvent<string>) => void;
}) => {
  return (
    <Select label="Region" onChange={onChange}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {regions.map((region) => (
        <MenuItem key={region.region} value={region.region}>
          {region.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectRegion;
