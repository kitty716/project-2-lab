var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

var allKiosk = [];
var allTotalbeanPerHour = [];
var allTotalbean = 0;
function kiosk(location, minCusHr, maxCusHr, avgCupPerCus, avgPoundPerCus){
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
  console.log(this);
};
kiosk.prototype.calcCustomersPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i ++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.customersPerHour.push(customers);
    this.dailyCustomersTotal += customers;
  }
  console.log('customersPerHour=' + this.customersPerHour);
  console.log('dailyCustomersTotal=' + this.dailyCustomersTotal);
};
kiosk.prototype.calcCupsPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var cups = this.avgCupsPerCustomer * this.customersPerHour[i];
    cups = parseFloat(cups.toFixed(1));
    this.cupsPerHour.push(cups);
    this.dailyCupsTotal += cups;
  }
  console.log('cupsPerHour=' + this.cupsPerHour);
  console.log('dailyCupsTotal=' + this.dailyCupsTotal);
};
kiosk.prototype.calcPoundPackagesPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var pounds = this.avgPoundsPerCustomer * this.customersPerHour[i];
    pounds = parseFloat(pounds.toFixed(1));
    this.poundPackagesPerHour.push(pounds);
    this.dailyPoundPackagesTotal += pounds;
  }
  console.log('poundPackagesPerHour=' + this.poundPackagesPerHour);
  console.log('dailyPoundPackagesTotal=' + this.dailyPoundPackagesTotal);
};
kiosk.prototype.calcBeansNeededForCupsPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var beanHour = this.cupsPerHour[i] / 16;
    beanHour = parseFloat(beanHour.toFixed(1));
    this.beansNeededForCupsPerHour.push(beanHour);
    this.dailyBeansNeededForCup += beanHour;
  }
  console.log('beansNeededForCupsPerHour=' + this.beansNeededForCupsPerHour);
  console.log('dailyBeansNeededForCup=' + this.dailyBeansNeededForCup);
};
kiosk.prototype.calcTotalBeansPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var tBeanHour = this.poundPackagesPerHour[i] + this.beansNeededForCupsPerHour[i];
    tBeanHour = parseFloat(tBeanHour.toFixed(1));
    this.totalBeansPerHour.push(tBeanHour);
    this.dailyBeansNeeded += tBeanHour;
  }
  console.log('totalBeansPerHour=' + this.totalBeansPerHour);
  console.log('dailyBeansNeeded=' + this.dailyBeansNeeded);
};
//total number of cups,  total number of beans-by-the-pound sold per hour and then divide accordingly.
kiosk.prototype.calcEmpPerHour = function() {
  for (var i = 0; i < hours.length; i ++) {
    var emp = (this.cupsPerHour[i] + this.poundPackagesPerHour[i]) * 2 / 60;
    emp = Math.ceil(emp);
    this.empPerHour.push(emp);
    this.dailyEmpHourTotal += emp;
  }
  console.log('empPerHour=' + this.empPerHour);
  console.log('dailyEmpHourTotal=' + this.dailyEmpHourTotal);
};
kiosk.prototype.renderCalculate = function() {
  // call all of the other methods that calc data
  this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
  this.calcCupsPerHour();
  this.calcPoundPackagesPerHour();
  this.calcBeansNeededForCupsPerHour();
  this.calcTotalBeansPerHour();
  this.calcEmpPerHour();
};
//create instance new object
var pikePlace = new kiosk('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHill = new kiosk('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new kiosk('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new kiosk('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirport = new kiosk('Sea-Tac Airport', 28, 44, 1.1, 0.41);

function calcAllTotalBeanPerHour() {
  for(var i = 0; i < hours.length; i++) {
    var allBean = 0;
    for(var j = 0; j < allKiosk.length; j++) {
      allBean += allKiosk[j].totalBeansPerHour[i];
    }
    allTotalbeanPerHour.push(Math.floor(allBean));
    allTotalbean += Math.floor(allBean);
  }
  console.log('allTotalbeanPerHour = ' + allTotalbeanPerHour);
  console.log('allTotalbean = ' + allTotalbean);
};

var beanTable = document.getElementById('beans-table');
var baristaTable = document.getElementById('baristas-table');

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

function totalRow(table, arrayTotals) {
  // total head cell
  var trElement = document.createElement('tr');
  var totalCell = document.createElement('th');
  totalCell.textContent = 'Totals';
  trElement.appendChild(totalCell);
  //Total cell
  var totalNum = document.createElement('th');
  totalNum.textContent = allTotalbean;
  trElement.appendChild(totalNum);
  //loop for input hours in headerRow
  for (var i = 0; i < arrayTotals.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = arrayTotals[i];
    trElement.appendChild(thElement);
  }
  table.appendChild(trElement);
};
// creating funcation to output all kiosk info in loop
// creating funcation to calcuate totalEmpHr

pikePlace.renderCalculate();
capitolHill.renderCalculate();
seattlePublicLibrary.renderCalculate();
southLakeUnion.renderCalculate();
seaTacAirport.renderCalculate();
calcAllTotalBeanPerHour();
headerRow(beanTable, hours);
totalRow(beanTable, allTotalbeanPerHour);

headerRow(baristaTable, hours);
// testing only!!!
totalRow(baristaTable, allTotalbeanPerHour);
