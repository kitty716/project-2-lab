var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  totalBeansPerHour: [], // total = cupBean + packageBean
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
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
      console.log(beanHour);
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
    }
    console.log(this.totalBeansPerHour);
  },
  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour();
    pikePlace.calcPoundPackagesPerHour();
    pikePlace.calcBeansNeededForCupsPerHour();
    pikePlace.calcTotalBeansPerHour();
    // call all of the other methods that calc data
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
//tBeanHour = parseFloat(tBeanHour.toFixed(1));
    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at Pike Place Market: ' + this.dailyCupsTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at Pike Place Market: ' + this.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at Pike Place Market: ' + (this.dailyBeansNeededForCup + this.dailyPoundPackagesTotal).toFixed(1);;
    ulElement.appendChild(liElement);
  }
};
pikePlace.render();
