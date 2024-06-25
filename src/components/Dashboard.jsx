import React from 'react'
import Controller from './Controller'
import Editor from './Editor'
import RightNav from './RightNav'
import useStore from '../store/store'

const Dashboard = () => {


    return (
        <div className='dashboard'>
            {
                <div className='controller'>
                    <Controller />
                </div>
            }
            <div className='editor'>
                <Editor />
            </div>
            <RightNav />
        </div>
    )
}

export default Dashboard