var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var allKiosk = [];

//pikePlace
var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  totalBeansPerHour: [], // total = cupBean + packageBean
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [], //1 pound of beans makes 16 cups
  poundPackagesPerHour: [],
  empPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeededForCup: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
    console.log(this.dailyCustomersTotal);
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var cups = this.avgCupsPerCustomer * this.customersPerHour[i];
      cups = parseFloat(cups.toFixed(1));
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
    console.log(this.dailyCupsTotal);
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var pounds = this.avgPoundsPerCustomer * this.customersPerHour[i];
      pounds = parseFloat(pounds.toFixed(1));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;
    }
    console.log(this.dailyPoundPackagesTotal);
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var beanHour = this.cupsPerHour[i] / 16;
      beanHour = parseFloat(beanHour.toFixed(1));
      this.beansNeededForCupsPerHour.push(beanHour);
      this.dailyBeansNeededForCup += beanHour;
    }
    console.log(this.dailyBeansNeededForCup);
  },
  //beansPerHour
  calcTotalBeansPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var tBeanHour = this.poundPackagesPerHour[i] + this.beansNeededForCupsPerHour[i];
      tBeanHour = parseFloat(tBeanHour.toFixed(1));
      this.totalBeansPerHour.push(tBeanHour);
      this.dailyBeansNeeded += tBeanHour;
    }
    console.log(this.dailyBeansNeeded);
  },
  //calcEmpPerHour not output yet !!!
  calcEmpPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var emp = 2 * this.customersPerHour[i] / 60;
      emp = Math.ceil(emp);
      this.empPerHour.push(emp);
    }
    console.log(this.empPerHour);
  },
  render: function() {
    // call all of the other methods that calc data
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour();
    pikePlace.calcPoundPackagesPerHour();
    pikePlace.calcBeansNeededForCupsPerHour();
    pikePlace.calcTotalBeansPerHour();
    pikePlace.calcEmpPerHour();

    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.totalBeansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + 'lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // create a <li>
    // give that <li> content
    // append the <li> to the <ul>
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at Pike Place Market: ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at Pike Place Market: ' + this.dailyCupsTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at Pike Place Market: ' + this.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at Pike Place Market: ' + this.dailyBeansNeeded.toFixed(1);
    ulElement.appendChild(liElement);
  }
};
pikePlace.render();

//Capitol Hill
var capitolHill = {
  locationName: 'Capitol Hill',
  minCustomersHour: 12,
  maxCustomersHour: 28,
  avgCupsPerCustomer: 3.2,
  avgPoundsPerCustomer: 0.03,
  totalBeansPerHour: [], // total = cupBean + packageBean
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  empPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeededForCup: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
    console.log(this.dailyCustomersTotal);
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var cups = this.avgCupsPerCustomer * this.customersPerHour[i];
      cups = parseFloat(cups.toFixed(1));
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
    console.log(this.dailyCupsTotal);
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var pounds = this.avgPoundsPerCustomer * this.customersPerHour[i];
      pounds = parseFloat(pounds.toFixed(1));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;
    }
    console.log(this.dailyPoundPackagesTotal);
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var beanHour = this.cupsPerHour[i] / 16;
      beanHour = parseFloat(beanHour.toFixed(1));
      this.beansNeededForCupsPerHour.push(beanHour);
      this.dailyBeansNeededForCup += beanHour;
    }
    console.log(this.dailyBeansNeededForCup);
  },
  //beansPerHour
  calcTotalBeansPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var tBeanHour = this.poundPackagesPerHour[i] + this.beansNeededForCupsPerHour[i];
      tBeanHour = parseFloat(tBeanHour.toFixed(1));
      this.totalBeansPerHour.push(tBeanHour);
      this.dailyBeansNeeded += tBeanHour;
    }
    console.log(this.dailyBeansNeeded);
  },
  //calcEmpPerHour not output yet !!!
  calcEmpPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var emp = 2 * this.customersPerHour[i] / 60;
      emp = Math.ceil(emp);
      this.empPerHour.push(emp);
    }
    console.log(this.empPerHour);
  },
  render: function() {
    // call all of the other methods that calc data
    capitolHill.calcCustomersPerHour(capitolHill.minCustomersHour, capitolHill.maxCustomersHour);
    capitolHill.calcCupsPerHour();
    capitolHill.calcPoundPackagesPerHour();
    capitolHill.calcBeansNeededForCupsPerHour();
    capitolHill.calcTotalBeansPerHour();
    capitolHill.calcEmpPerHour();

    var ulElement = document.getElementById('capitol');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.totalBeansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + 'lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // create a <li>
    // give that <li> content
    // append the <li> to the <ul>
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at Capitol Hill: ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at Capitol Hill: ' + this.dailyCupsTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at Capitol Hill: ' + this.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at Capitol Hill: ' + this.dailyBeansNeeded.toFixed(1);
    ulElement.appendChild(liElement);
  }
};
capitolHill.render();

//Seattle Public Library
var seattlePublicLibrary = {
  locationName: 'Seattle Public Library',
  minCustomersHour: 9,
  maxCustomersHour: 45,
  avgCupsPerCustomer: 2.6,
  avgPoundsPerCustomer: 0.02,
  totalBeansPerHour: [], // total = cupBean + packageBean
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  empPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeededForCup: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
    console.log(this.dailyCustomersTotal);
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var cups = this.avgCupsPerCustomer * this.customersPerHour[i];
      cups = parseFloat(cups.toFixed(1));
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
    console.log(this.dailyCupsTotal);
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var pounds = this.avgPoundsPerCustomer * this.customersPerHour[i];
      pounds = parseFloat(pounds.toFixed(1));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;
    }
    console.log(this.dailyPoundPackagesTotal);
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var beanHour = this.cupsPerHour[i] / 16;
      beanHour = parseFloat(beanHour.toFixed(1));
      this.beansNeededForCupsPerHour.push(beanHour);
      this.dailyBeansNeededForCup += beanHour;
    }
    console.log(this.dailyBeansNeededForCup);
  },
  //beansPerHour
  calcTotalBeansPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var tBeanHour = this.poundPackagesPerHour[i] + this.beansNeededForCupsPerHour[i];
      tBeanHour = parseFloat(tBeanHour.toFixed(1));
      this.totalBeansPerHour.push(tBeanHour);
      this.dailyBeansNeeded += tBeanHour;
    }
    console.log(this.dailyBeansNeeded);
  },
  //calcEmpPerHour not output yet !!!
  calcEmpPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var emp = 2 * this.customersPerHour[i] / 60;
      emp = Math.ceil(emp);
      this.empPerHour.push(emp);
    }
    console.log(this.empPerHour);
  },
  render: function() {
    // call all of the other methods that calc data
    seattlePublicLibrary.calcCustomersPerHour(seattlePublicLibrary.minCustomersHour, seattlePublicLibrary.maxCustomersHour);
    seattlePublicLibrary.calcCupsPerHour();
    seattlePublicLibrary.calcPoundPackagesPerHour();
    seattlePublicLibrary.calcBeansNeededForCupsPerHour();
    seattlePublicLibrary.calcTotalBeansPerHour();
    seattlePublicLibrary.calcEmpPerHour();

    var ulElement = document.getElementById('spl');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.totalBeansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + 'lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // create a <li>
    // give that <li> content
    // append the <li> to the <ul>
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at Seattle Public Library: ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at Seattle Public Library: ' + this.dailyCupsTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at Seattle Public Library: ' + this.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at Seattle Public Library: ' + this.dailyBeansNeeded.toFixed(1);
    ulElement.appendChild(liElement);
  }
};
seattlePublicLibrary.render();

//South Lake Union
var southLakeUnion = {
  locationName: 'South Lake Union',
  minCustomersHour: 5,
  maxCustomersHour: 18,
  avgCupsPerCustomer: 1.3,
  avgPoundsPerCustomer: 0.04,
  totalBeansPerHour: [], // total = cupBean + packageBean
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  empPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeededForCup: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
    console.log(this.dailyCustomersTotal);
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var cups = this.avgCupsPerCustomer * this.customersPerHour[i];
      cups = parseFloat(cups.toFixed(1));
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
    console.log(this.dailyCupsTotal);
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var pounds = this.avgPoundsPerCustomer * this.customersPerHour[i];
      pounds = parseFloat(pounds.toFixed(1));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;
    }
    console.log(this.dailyPoundPackagesTotal);
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var beanHour = this.cupsPerHour[i] / 16;
      beanHour = parseFloat(beanHour.toFixed(1));
      this.beansNeededForCupsPerHour.push(beanHour);
      this.dailyBeansNeededForCup += beanHour;
    }
    console.log(this.dailyBeansNeededForCup);
  },
  //beansPerHour
  calcTotalBeansPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var tBeanHour = this.poundPackagesPerHour[i] + this.beansNeededForCupsPerHour[i];
      tBeanHour = parseFloat(tBeanHour.toFixed(1));
      this.totalBeansPerHour.push(tBeanHour);
      this.dailyBeansNeeded += tBeanHour;
    }
    console.log(this.dailyBeansNeeded);
  },
  //calcEmpPerHour not output yet !!!
  calcEmpPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var emp = 2 * this.customersPerHour[i] / 60;
      emp = Math.ceil(emp);
      this.empPerHour.push(emp);
    }
    console.log(this.empPerHour);
  },
  render: function() {
    // call all of the other methods that calc data
    southLakeUnion.calcCustomersPerHour(southLakeUnion.minCustomersHour, southLakeUnion.maxCustomersHour);
    southLakeUnion.calcCupsPerHour();
    southLakeUnion.calcPoundPackagesPerHour();
    southLakeUnion.calcBeansNeededForCupsPerHour();
    southLakeUnion.calcTotalBeansPerHour();
    southLakeUnion.calcEmpPerHour();

    var ulElement = document.getElementById('slu');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.totalBeansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + 'lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // create a <li>
    // give that <li> content
    // append the <li> to the <ul>
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at South Lake Union: ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at South Lake Union: ' + this.dailyCupsTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at South Lake Union: ' + this.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at South Lake Union: ' + this.dailyBeansNeeded.toFixed(1);
    ulElement.appendChild(liElement);
  }
};
southLakeUnion.render();

//Sea-Tac Airport
var seaTacAirport = {
  locationName: 'Sea-Tac Airport',
  minCustomersHour: 28,
  maxCustomersHour: 44,
  avgCupsPerCustomer: 1.1,
  avgPoundsPerCustomer: 0.41,
  totalBeansPerHour: [], // total = cupBean + packageBean
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  empPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeededForCup: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
    console.log(this.dailyCustomersTotal);
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var cups = this.avgCupsPerCustomer * this.customersPerHour[i];
      cups = parseFloat(cups.toFixed(1));
      this.cupsPerHour.push(cups);
      this.dailyCupsTotal += cups;
    }
    console.log(this.dailyCupsTotal);
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var pounds = this.avgPoundsPerCustomer * this.customersPerHour[i];
      pounds = parseFloat(pounds.toFixed(1));
      this.poundPackagesPerHour.push(pounds);
      this.dailyPoundPackagesTotal += pounds;
    }
    console.log(this.dailyPoundPackagesTotal);
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var beanHour = this.cupsPerHour[i] / 16;
      beanHour = parseFloat(beanHour.toFixed(1));
      this.beansNeededForCupsPerHour.push(beanHour);
      this.dailyBeansNeededForCup += beanHour;
    }
    console.log(this.dailyBeansNeededForCup);
  },
  //beansPerHour
  calcTotalBeansPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var tBeanHour = this.poundPackagesPerHour[i] + this.beansNeededForCupsPerHour[i];
      tBeanHour = parseFloat(tBeanHour.toFixed(1));
      this.totalBeansPerHour.push(tBeanHour);
      this.dailyBeansNeeded += tBeanHour;
    }
    console.log(this.dailyBeansNeeded);
  },
  //calcEmpPerHour not output yet !!!
  calcEmpPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var emp = 2 * this.customersPerHour[i] / 60;
      emp = Math.ceil(emp);
      this.empPerHour.push(emp);
    }
    console.log(this.empPerHour);
  },
  render: function() {
    // call all of the other methods that calc data
    seaTacAirport.calcCustomersPerHour(seaTacAirport.minCustomersHour, seaTacAirport.maxCustomersHour);
    seaTacAirport.calcCupsPerHour();
    seaTacAirport.calcPoundPackagesPerHour();
    seaTacAirport.calcBeansNeededForCupsPerHour();
    seaTacAirport.calcTotalBeansPerHour();
    seaTacAirport.calcEmpPerHour();

    var ulElement = document.getElementById('seatac');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.totalBeansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + 'lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // create a <li>
    // give that <li> content
    // append the <li> to the <ul>
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at Sea-Tac Airport	: ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at Sea-Tac Airport	: ' + this.dailyCupsTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at Sea-Tac Airport	: ' + this.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at Sea-Tac Airport	: ' + this.dailyBeansNeeded.toFixed(1);
    ulElement.appendChild(liElement);
  }
};
seaTacAirport.render();
