import { Line, Pie } from '@ant-design/charts';
import React from 'react'

function Charts({sortedTransactions}) {

    const data = sortedTransactions.map((item) => {
        return {
            date: item.date,
            amount: item.amount,
        }
    });

    const spendingData = sortedTransactions.filter(
        (transaction) => {if(transaction.type === "expense"){
            return {
                tag: transaction.tag, 
                amount: transaction.amount
            }
        }})

    let finalSpendings = spendingData.reduce((acc, obj) => {
        let key = obj.tag
        if(!acc[key]) {
            acc[key] = {tag:obj.tag, amount: obj.amount}
        } else {
            acc[key].amount += obj.amount
        }
        return acc
    }, {})
    
      const config = {
        data: data,
        xField: 'date',
        yField: 'amount',
      };

      const spendingConfig = {
        data: spendingData,
        angleField: 'amount',
        colorField: 'tag',
      }

  return (
    <div className='flex m-5 mt-10'>
        <div className='w-3/5 shadow-lg'>
            <h2 className='text-2xl text-center mb-2'>Your Analytics</h2>
            <Line {...config} className=''/>
        </div>
        <div className='w-2/5 shadow-lg'>
            <h2 className='text-2xl text-center mb-2'>Your Analytics</h2>
            <Pie {...spendingConfig} className=''/>
        </div>
    </div>
  )
}

export default Charts