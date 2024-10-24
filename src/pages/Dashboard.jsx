import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import moment from 'moment';


function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type,
      date: moment(values.date).format("DD-MM-YYYY"),
      name: values.name,
      amount: parseFloat(values.amount),
      tag: values.tag
    }
    addTransaction(newTransaction)
  }

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      )
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction added successfully")
      let newArr = transactions
      newArr.push(transaction)
      setTransactions(newArr)
      calculateBalances()
      setIsIncomeModalVisible(false)
      setIsExpenseModalVisible(false)
    } catch (error) {
      console.log("Error adding document: ", error);
      if(!many) {
        toast.error("Error adding transaction")
      }
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  async function getTransactions() {
    setLoading(true)
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = []
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data())
      })
      setTransactions(transactionsArray)
      console.log(transactionsArray)
      toast.success("Transactions fetched successfully")
    }
    setLoading(false)
  }

  useEffect(() => {
    calculateBalances()
  }, [transactions])

  function calculateBalances() {
    let totalIncome = 0
    let totalExpense = 0
    transactions.forEach(transaction => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount
      } else {
        totalExpense += transaction.amount
      }
    })
    setIncome(totalIncome)
    setExpense(totalExpense)
    setBalance(totalIncome - totalExpense)
  }


  return (
    <div>
      <Header />
      {loading? 
      (<p>Loading...</p>)
      :
      ( <>
        <Cards 
          income={income}
          expense={expense}
          balance={balance}
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}  
        />
        <AddIncomeModal 
          isIncomeModalVisible={isIncomeModalVisible}
          handleIncomeCancel={handleIncomeCancel}
          onFinish={onFinish}
        />
        <AddExpenseModal 
          isExpenseModalVisible={isExpenseModalVisible}
          handleExpenseCancel={handleExpenseCancel}
          onFinish={onFinish}
        />
      </>
      )}
    </div>
  )
}

export default Dashboard