import { parseISO, format } from 'date-fns';

export default function Date({ dateString } : {dateString: string}) {
  if(typeof dateString == 'undefined'){
    return <time>'*undefined date*'</time>
  }
  else{
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
  }
}