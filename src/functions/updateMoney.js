const updateMoney = (props) => {
  var oldValue = props.wallet.Money.value;
  var lastUpdated = props.wallet.Money.lastUpdated;
  var currentTime = new Date().getTime();
  var diffTime = (currentTime - lastUpdated) / 1000;
  var earned = Math.abs(props.wallet.totalIncome * diffTime);
  var newValue = parseFloat(earned > 0 ? earned : 0) + parseFloat(oldValue);

  props.dispatch({
    type: 'UpdateMoney',
    payload: {
      value: parseFloat(newValue).toFixed(2),
      lastUpdated: currentTime,
    },
  });
}

export default updateMoney;