export const requestStatus = {
  pending: "pending",
  accepted: "accepted",
  done: "done",
  canceled: "canceled",
}; // pending - ожидает привязки юриста (самим юристом или оператором), accepted - принята юристом, done - в процессе, canceled - отменен

export const rolesValue = {
  user: "USER",
  lawyer: "LAWYER",
  operator: "OPERATOR",
  admin: "ADMIN",
};

export const locale = {
  days: "Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота".split(
    ","
  ),
  daysShort: "Вс,Пн,Вт,Ср,Чт,Пт,Сб".split(","),
  months:
    "Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь".split(
      ","
    ),
  monthsShort: "Янв,Фев,Мар,Апр,Май,Июн,Июл,Авг,Сен,Окт,Ноя,Дек".split(","),
  firstDayOfWeek: 1,
};
