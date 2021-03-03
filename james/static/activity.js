// Insulin Component of the Simple Diabets Metabolism Model
// ''' We use the biexponential model given in Palerm (2009), which has been
// shown to be equivalent to the Hovorka Model(Bondia et al., 2018).

// 1. Insulin Activity Curve

// I(t) = U0 * (1 / (Kcl * (tau2 - tau1))) * (e^(-t/tau2) - e^(-t/tau1))
// where:
//     I(t) = plasma insulin (U/L)
//     t = time (min)
//     U0 = amount of insulin delivered by pump (U)
//     Kcl = insulin clearance rate (nominally 1 L/min)
//     tau1 = 55 min
//     tau2 = 70 min
//     NOTE: Parameters above assume body weight of 70 kg (~154 lbs) 
// '''

let tau1 = 55 
let tau2 = 70 
let Kcl = 1
let U0 = 1
let t = [];
for (var i = 1; i <= 8*60; i++) { // in minutes
   t.push(i);
}

let I = U0 * (1 / (Kcl * (tau2 - tau1))) * (Math.E(-t/tau2) - Math.E(-t/tau1))

// Plot
// fig = px.line(
//     title="Insulin Activity Curve",
//     x=t,
//     y=I,
//     labels={"x":"time (min)", "y":"Insulin (U/L)"}
// )
// fig.show()

// 2. Percent of Insulin Absorbed Over Time
// # insulin absorbed
// ''' the amount of insulin absorbed over the insulin duration
// '''

let ia = I.map(d => y+= d)

// Plot
// fig = px.line(
//     title="Percent of Insulin Absorbed Over Time",
//     x=t,
//     y=ia, 
//     labels={"x":"time (min)", "y":"Insulin Absorbed (U)"}
// )
// fig.show()

// 3. Insulin-on-board (IOB)
// ''' the amount of insulin on board will be the amount delivered at t=0
// minus the total amount absorbed over the insulin duration
// '''

let iob = ia.map(d => U0 - d)
// Plot
// fig = px.line(
//     title="Insulin On Board",
//     x=t, 
//     y=iob, 
//     labels={"x":"time (min)", "y":"IOB (U)"}
// )
// fig.show()

// 4. Cumulative effect of insulin on blood glucose
// ''' the cumulative effect of the insulin dose will be the
// total amount of insulin absorbed times the insulin sensitivity  
// '''

let ISF = 50  // insulin sensitivity factor (ISF) mg/dL/U
let insulin_effect = ia.map(d => -ISF * d)

// Plot
// fig = px.line(
//     title="Cumulative Effect of 1U of Insulin and an ISF of 50 mg/dL/U",
//     x=t,
//     y=insulin_effect, 
//     labels={"x":"time (min)", "y":"Cumulative Drop in BG (mg/dL)"}
// )
// fig.show()

// 5. Expected Change in BG every 5 minutes
// ''' lastly we can estimate the expected change in BG
// every 5 minutes by taking the derivative (rate of change)
// of the cumulative insulin effect
// '''

t_5min = np.arange(0, 8*60, 5)
ie_5min = insulin_effect[t_5min]
expected_drop = np.append(0, ie_5min[1:] - ie_5min[:-1])