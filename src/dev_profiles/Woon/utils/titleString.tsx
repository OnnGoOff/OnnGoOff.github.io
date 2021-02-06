const titleString = (input: string) => {
  if (input.length <= 0) return input;
  const a = input.toLowerCase();
  const b = a.split(' ');
  const c = b.map((str) => {
    for (let i = 0; i < str.length; i++) {
      if (str[i].match(/\w/)) {
        return str.substr(0, i) + str[i].toUpperCase() + str.substr(i + 1);
      }
    }
    return str[0].toUpperCase() + str.substr(1);
  });
  const d = c.join(' ');

  return d;
};

export default titleString;
