$(function() {

	new Chartist.Line('.ct-chart-line', {
	  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	  series: [
	    [12, 9, 7, 8, 5],
	    [2, 1, 3.5, 7, 3],
	    [1, 3, 4, 5, 6]
	  ]
	}, {
	  fullWidth: true,
	  chartPadding: {
	    right: 40
	  }
	});


	new Chartist.Line('.ct-chart-holes', {
	  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	  series: [
	    [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
	    [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
	    [null, null, null, null, 3, 4, 1, 3, 4,  6,  7,  9, 5, null, null, null]
	  ]
	}, {
	  fullWidth: true,
	  chartPadding: {
	    right: 10
	  },
	  low: 0
	});


	new Chartist.Line('.ct-chart-area', {
	  labels: [1, 2, 3, 4, 5, 6, 7, 8],
	  series: [
	    [5, 9, 7, 8, 5, 3, 5, 4]
	  ]
	}, {
	  fullWidth: true,
	  low: 0,
	  showArea: true
	});


	new Chartist.Line('.ct-chart-bipolar', {
		  labels: [1, 2, 3, 4, 5, 6, 7, 8],
		  series: [
		    [1, 2, 3, 1, -2, 0, 1, 0],
		    [-2, -1, -2, -1, -2.5, -1, -2, -1],
		    [0, 0, 0, 1, 2, 2.5, 2, 1],
		    [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
		  ]
		}, {
		  high: 3,
		  low: -3,
		  showArea: true,
		  showLine: false,
		  showPoint: false,
		  fullWidth: true,
		  axisX: {
		    showLabel: false,
		    showGrid: false
		  }
	});


	new Chartist.Bar('.ct-chart-multiline', {
	  labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
	  series: [
	    [60000, 40000, 80000, 70000],
	    [40000, 30000, 70000, 65000],
	    [30000, 20000, 10000, 40000]
	  ]
	}, {
	  seriesBarDistance: 10,
	  axisX: {
	    offset: 60
	  },
	  axisY: {
	    offset: 80,
	    labelInterpolationFnc: function(value) {
	      return value + ' CHF'
	    },
	    scaleMinSpace: 15
	  }
	});


	new Chartist.Bar('.ct-chart-stacked', {
	  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
	  series: [
	    [800000, 1200000, 1400000, 1300000],
	    [200000, 400000, 500000, 300000],
	    [100000, 200000, 400000, 600000]
	  ]
	}, {
	  stackBars: true,
	  axisY: {
	    labelInterpolationFnc: function(value) {
	      return (value / 1000) + 'k';
	    }
	  }
	}).on('draw', function(data) {
	  if(data.type === 'bar') {
	    data.element.attr({
	      style: 'stroke-width: 30px'
	    });
	  }
	});

	new Chartist.Bar('.ct-chart-horiz', {
	  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	  series: [
	    [5, 4, 3, 7, 5, 10, 3],
	    [3, 2, 9, 5, 4, 6, 4]
	  ]
	}, {
	  seriesBarDistance: 10,
	  reverseData: true,
	  horizontalBars: true,
	  axisY: {
	    offset: 70
	  }
	});

	new Chartist.Bar('.ct-chart-distributed', {
	  labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
	  series: [20, 60, 120, 200, 180, 20, 10]
	}, {
	  distributeSeries: true
	});


	var data = {
	  series: [5, 3, 4]
	};

	var sum = function(a, b) { return a + b };

	new Chartist.Pie('.ct-chart-pie', data, {
	  labelInterpolationFnc: function(value) {
	    return Math.round(value / data.series.reduce(sum) * 100) + '%';
	  }
	});


	var data2 = {
	  labels: ['Bananas', 'Apples', 'Grapes'],
	  series: [20, 15, 40]
	};

	var options2 = {
	  labelInterpolationFnc: function(value) {
	    return value[0]
	  }
	};

	var responsiveOptions2 = [
	  ['screen and (min-width: 640px)', {
	    chartPadding: 30,
	    labelOffset: 100,
	    labelDirection: 'explode',
	    labelInterpolationFnc: function(value) {
	      return value;
	    }
	  }],
	  ['screen and (min-width: 1024px)', {
	    labelOffset: 80,
	    chartPadding: 20
	  }]
	];

	new Chartist.Pie('.ct-chart-pie-labels', data2, options2, responsiveOptions2);


	new Chartist.Pie('.ct-chart-gauge', {
	  series: [20, 10, 30, 40]
	}, {
	  donut: true,
	  donutWidth: 60,
	  startAngle: 270,
	  total: 200,
	  showLabel: false
	});


});