import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


const App = () => {
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });
  const handleSubmitValues = e => {
    calculateResults(userValues);
  };

  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 1; //1 for months 12 for year
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ margin: 25 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#000', fontWeight: '700', fontSize: 18 }}>
              EMI Calculator
            </Text>
          </View>
          <View>
            <Text style={{ color: '#000' }}>Loan Amount (₹)</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#000',
              }}>
              <TextInput
                style={{ color: 'black' }}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={e => {
                  userValues.amount = e;
                }}
                placeholderTextColor="gray"
                placeholder="Enter Loan Amount"
              />
            </View>
          </View>
          <View>
            <Text style={{ color: '#000' }}>Interest Rate (%)</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#000',
              }}>
              <TextInput
                style={{ color: 'black' }}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={e => {
                  userValues.interest = e;
                }}
                placeholderTextColor="gray"
                placeholder="Enter Interest Rate"
              />
            </View>
          </View>
          <View>
            <Text style={{ color: '#000' }}>Tenure</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#000',
              }}>
              <TextInput
                style={{ color: 'black' }}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={e => {
                  userValues.years = e;
                }}
                placeholderTextColor="gray"
                placeholder="Enter Tenure"
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                calculateResults(userValues);
                console.log(userValues);
              }}
              style={{
                backgroundColor: '#3D73F6',
                borderWidth: 1,
                alignItems: 'center',
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
              }}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ margin: 25 }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'green',
            }}>
            <Text>Monthly Payment (Loan EMI):</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#000' }}> ₹</Text>
              <TextInput
                editable={false}
                value={results.monthlyPayment}
                style={{ color: '#000' }}
              />
            </View>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'green',
            }}>
            <Text>Total Payment:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#000' }}> ₹</Text>
              <TextInput
                editable={false}
                value={results.totalPayment}
                style={{ color: '#000' }}
              />
            </View>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'green',
            }}>
            <Text>Total Interest:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#000' }}> ₹</Text>
              <TextInput
                editable={false}
                value={results.totalInterest}
                style={{ color: '#000' }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default App;
