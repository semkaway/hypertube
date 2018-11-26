const messages = {
  _default: (field) => `Значення поля ${field} неприпустимо.`,
  after: (field, [target, inclusion]) => `У полі ${field} повинна бути дата після ${inclusion ? 'або рівна ' : ''}${target}.`,
  alpha: (field) => `Поле ${field} може містити тільки літери.`,
  alpha_dash: (field) => `Поле ${field} може містити тільки літери, цифри та дефіс.`,
  alpha_num: (field) => `Поле ${field} може містити тільки літери та цифри.`,
  alpha_spaces: (field) => `Поле ${field} може містити тільки літери та пробіли.`,
  before: (field, [target, inclusion]) => `Поле ${field} повінно містити дату до ${inclusion ? 'або рівну ' : ''}${target}.`,
  between: (field, [min, max]) => `Поле ${field} повинно бути між ${min} та ${max}.`,
  confirmed: () => `Поля не співпадають.`,
  credit_card: (field) => `Поле ${field} повинно бути дійсним номером карти`,
  date_between: (field, [min, max]) => `Поле ${field} повинно бути між ${min} та ${max}.`,
  date_format: (field, [format]) => `Поле ${field} повинно бути в форматі ${format}.`,
  decimal: (field, [decimals = '*'] = []) => `Поле ${field} повинно бути числовим та може містити ${decimals === '*' ? '' : decimals} десяткових числа.`,
  digits: (field, [length]) => `Поле ${field} повинно бути числовим та точно містити ${length} цифри.`,
  dimensions: (field, [width, height]) => `Поле ${field} повинно бути ${width} пікселів на ${height} пікселів.`,
  email: (field) => `Поле ${field} повинно бути коректною адресою електронної пошти.`,
  excluded: (field) => `Поле ${field} повинно бути допустимим значенням.`,
  ext: (field, [...args]) => `Поле ${field} повинно бути допустимим дійсним файлом. (${args})`,
  image: (field) => `Поле ${field} повинно бути зображенням.`,
  included: (field) => `Поле ${field} повинно бути допустимим значенням.`,
  integer: (field) => `Поле ${field} повинно бути цілим числом.`,
  ip: (field) => `Поле ${field} повинно бути дійсною IP-адресою.`,
  length: (field, [length, max]) => {
    if (max) {
      return `Довжина поля ${field} повинна бути між ${length} та ${max}.`;
    }

    return `Довжина поля ${field} повинна бути ${length}.`;
  },
  max: (field, [length]) => `Поле ${field} не може бути більше ${length} символів.`,
  max_value: (field, [max]) => `Поле ${field} повинно бути ${max} або менше.`,
  mimes: (field, [...args]) => `Поле ${field} повинно мати допустимий тип файлу. (${args})`,
  min: (field, [length]) => `Поле ${field} повинно бути не менше ніж ${length} символів.`,
  min_value: (field, [min]) => `Поле ${field} повинно бути ${min} або більше.`,
  numeric: (field) => `Поле ${field} повинно бути числом.`,
  regex: (field) => `Поле ${field} має помилковий формат.`,
  required: (field) => `Поле ${field} обов'язкове для заповнення.`,
  url: (field) => `Поле ${field} має помилковий формат URL.`
};

const locale = {
  name: 'uk',
  messages,
  attributes: {}
};

export default locale;
