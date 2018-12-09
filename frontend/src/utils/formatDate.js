import * as moment from 'moment';
import 'moment/locale/uk';
import 'moment/locale/ru';

export default function formatDate(oldDate) {
  moment.locale(localStorage.locale)
  return moment(oldDate).fromNow();
}
