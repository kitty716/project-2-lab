var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var allKiosk = [];
var allTotalbeanPerHour = [];
var allTotalbean = 0;
var allTotalEmpPerHour = [];
var allTotalEmp = 0;
var beanTable = document.getElementById('beans-table');
var baristaTable = document.getElementById('baristas-table');
var newKioskForm = document.getElementById('newKiosk');
var clearInputBut = document.getElementById('clearInput');
function Kiosk(location, minCusHr, maxCusHr, avgCupPerCus, avgPoundPerCus){
  this.localName = location;
  this.minCustomersHour = minCusHr;
  this.maxCustomersHour = maxCusHr;
  this.avgCupsPerCustomer = avgCupPerCus;
  this.avgPoundsPerCustomer = avgPoundPerCus;
  this.customersPerHour = [];
  this.cupsPerHour = [];
  this.beansNeededForCupsPerHour = []; //1 pound of beans makes 16 cups
  this.poundPackagesPerHour = [];
  this.totalBeansPerHour = [];  //total = cupBean + packageBean
  this.empPerHour = [];
  this.dailyCustomersTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPackagesTotal = 0;
  this.dailyBeansNeededForCup = 0;
  this.dailyBeansNeeded = 0;  //total = cupBean + packageBean
  this.dailyEmpHourTotal = 0;
  allKiosk.push(this);
};
Kiosk.prototype.calcCustomersPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i ++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.customersPerHour.push(customers);
    this.dailyCustomersTotal += customers;
  }
};
//////////////////////////////////////////
Kiosk.prototype.calcCupsBeans = function (rate, destArray, destTotal) {
  for (var i = 0; i < hours.length; i ++) {
    var hourTotal = Math.floor(this.customersPerHour[i] * rate);
    destArray.push(hourTotal);
    destTotal += hourTotal;
  }
};
// Kiosk.prototype.calcCupsPerHour = function() {
//   for (var i = 0; i < hours.length; i ++) {
//     var cups = this.avgCupsPerCustomer * this.customersPerHour[i];
//     cups = parseFloat(cups.toFixed(1));
//     this.cupsPerHour.push(cups);
//     this.dailyCupsTotal += cups;
//   }
// };
// Kiosk.prototype.calcPoundPackagesPerHour = function() {
//   for (var i = 0; i < hours.length; i ++) {
//     var pounds = this.avgPoundsPerCustomer * this.customersPerHour[i];
//     pounds = parseFloat(pounds.toFixed(1));
//     this.poundPackagesPerHour.push(pounds);
//     this.dailyPoundPackagesTotal += pounds;
//   }
// };
Kiosk.prototype.calcBeansNeededForCupsPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var beanHour = this.cupsPerHour[i] / 16;
    beanHour = parseFloat(beanHour.toFixed(1));
    this.beansNeededForCupsPerHour.push(beanHour);
    this.dailyBeansNeededForCup += beanHour;
  }
};
Kiosk.prototype.calcTotalBeansPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var tBeanHour = this.poundPackagesPerHour[i] + this.beansNeededForCupsPerHour[i];
    tBeanHour = parseFloat(tBeanHour.toFixed(1));
    this.totalBeansPerHour.push(tBeanHour);
    this.dailyBeansNeeded += tBeanHour;
  }
};
Kiosk.prototype.calcEmpPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var emp = (this.cupsPerHour[i] + this.poundPackagesPerHour[i]) * 2 / 60;
    emp = Math.ceil(emp);
    this.empPerHour.push(emp);
    this.dailyEmpHourTotal += emp;
  }
};
Kiosk.prototype.calculateData = function() {
  this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
  // this.calcCupsPerHour();
  // this.calcPoundPackagesPerHour();
  this.calcCupsBeans(this.avgCupsPerCustomer, this.cupsPerHour, this.dailyCupsTotal);
  this.calcCupsBeans(this.avgPoundsPerCustomer, this.poundPackagesPerHour, this.dailyPoundPackagesTotal);

  this.calcBeansNeededForCupsPerHour();
  this.calcTotalBeansPerHour();
  this.calcEmpPerHour();
};
Kiosk.prototype.renderBean = function() {
  var trElement = document.createElement('tr');
  var thLocation = document.createElement('th');
  thLocation.textContent = this.localName;
  trElement.appendChild(thLocation);
  var thTotalPerLocation = document.createElement('th');
  thTotalPerLocation.textContent = Math.round(this.dailyBeansNeeded);
  trElement.appendChild(thTotalPerLocation);
  for(var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = Math.round(this.totalBeansPerHour[j]);
    trElement.appendChild(tdElement);
  }
  beanTable.appendChild(trElement);
};
Kiosk.prototype.renderBaristas = function () {
  var trElement = document.createElement('tr');
  var thLocation = document.createElement('th');
  thLocation.textContent = this.localName;
  trElement.appendChild(thLocation);
  var thTotalPerLocation = document.createElement('th');
  thTotalPerLocation.textContent = Math.round(this.dailyEmpHourTotal);
  trElement.appendChild(thTotalPerLocation);
  for(var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = Math.round(this.empPerHour[j]);
    trElement.appendChild(tdElement);
  }
  baristaTable.appendChild(trElement);
};
var pikePlace = new Kiosk('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHill = new Kiosk('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new Kiosk('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new Kiosk('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirport = new Kiosk('Sea-Tac Airport', 28, 44, 1.1, 0.41);
function calcAllTotalBeanPerHour() {
  for(var i = 0; i < hours.length; i++) {
    var allBean = 0;
    for(var j = 0; j < allKiosk.length; j++) {
      allBean += allKiosk[j].totalBeansPerHour[i];
    }
    allTotalbeanPerHour.push(Math.round(allBean));
    allTotalbean += Math.round(allBean);
  }
};
function calcAllTotalEmpPerHour() {
  for(var i = 0; i < hours.length; i++) {
    var allEmpHr = 0;
    for(var j = 0; j < allKiosk.length; j++) {
      allEmpHr += allKiosk[j].empPerHour[i];
    }
    allTotalEmpPerHour.push(Math.round(allEmpHr));
    allTotalEmp += Math.round(allEmpHr);
  }
};
function headerRow(table, arrayHeadings) {
  //blank head cell
  var trElement = document.createElement('tr');
  var emptyCell = document.createElement('th');
  emptyCell.textContent = '';
  trElement.appendChild(emptyCell);
  //Daily Location Total cell
  var dailyTotalCell = document.createElement('th');
  dailyTotalCell.textContent = 'Daily Location Total';
  trElement.appendChild(dailyTotalCell);
  //loop for input hours in headerRow
  for (var i = 0; i < arrayHeadings.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = arrayHeadings[i];
    trElement.appendChild(thElement);
  }
  table.appendChild(trElement);
};
function totalRow(table, arrayTotals, dailyTotal) {
  // total head cell
  var trElement = document.createElement('tr');
  var totalCell = document.createElement('th');
  totalCell.textContent = 'Totals';
  trElement.appendChild(totalCell);
  //Total cell
  var totalNum = document.createElement('th');
  totalNum.textContent = dailyTotal;
  trElement.appendChild(totalNum);
  //loop for input total in totalRow
  for (var i = 0; i < arrayTotals.length; i++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = arrayTotals[i];
    trElement.appendChild(tdElement);
  }
  table.appendChild(trElement);
};
function outputTable() {
  //clear total and array for totalRow for newKiosk
  allTotalbeanPerHour = [];
  allTotalbean = 0;
  allTotalEmpPerHour = [];
  allTotalEmp = 0;
  calcAllTotalBeanPerHour();
  calcAllTotalEmpPerHour();
  //output table
  beanTable.innerHTML = '';
  baristaTable.innerHTML = '';
  headerRow(beanTable, hours);
  headerRow(baristaTable, hours);
  for (var i = 0; i < allKiosk.length; i++) {
    allKiosk[i].renderBean();
    allKiosk[i].renderBaristas();
  }
  totalRow(beanTable, allTotalbeanPerHour, allTotalbean);
  totalRow(baristaTable, allTotalEmpPerHour, allTotalEmp);
}
function handleNewKioskSubmit(event) {
  event.preventDefault(); //prevents page reload
  var hLocation = event.target.hLocation.value;
  var hminCusHr = parseFloat(event.target.hMinCusHr.value);
  var hMaxCusHr = parseFloat(event.target.hMaxCusHr.value);
  var hAvgCupPerCus = parseFloat(event.target.hAvgCupPerCus.value);
  var hAvgPoundPerCus = parseFloat(event.target.hAvgPoundPerCus.value);
  var newKiosk = new Kiosk(hLocation, hminCusHr, hMaxCusHr, hAvgCupPerCus, hAvgPoundPerCus);
  newKiosk.calculateData();//allKiosk.push(newKiosk); already done in Object constructor
  event.target.hLocation.value = null;
  event.target.hMinCusHr.value = null;
  event.target.hMaxCusHr.value = null;
  event.target.hAvgCupPerCus.value = null;
  event.target.hAvgPoundPerCus.value = null;
  outputTable();
}
//calcuate all data
for (var i = 0; i < allKiosk.length; i++) {
  allKiosk[i].calculateData();
}
outputTable();
newKioskForm.addEventListener('submit', handleNewKioskSubmit);
