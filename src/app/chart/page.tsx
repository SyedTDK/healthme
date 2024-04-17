import React from 'react';
import ChartComponent from './chart';


const MyPage: React.FC = () => {
  const data = [12, 19, 3, 5, 2, 3];
  const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    return (
    //  Couldn't figure out how to size the chart, instead using the parent container to control size
    <div className='w-1/2 h-1/2'>  
        
      <h1>My Chart</h1>
      <ChartComponent data={data} labels={labels}  />
    </div>
  );
};

export default MyPage;