import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import { getMessagesES, localizer } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'



export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  const {openDateModal}= useUiStore()
  const {events,setActiveEvent,activeEvent}= useCalendarStore()


  const onDobleClick = (e) => {
    openDateModal()
  }
  const onSelect = (e) => {
   setActiveEvent(e)
  }
  const onViewChanged = (e) => {
    localStorage.setItem('lastView', e)
  }


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px' }}
        messages={getMessagesES()}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDobleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

      />
      <FabAddNew />
      <CalendarModal />
      {
        activeEvent && <FabDelete />
      }
      
    </>
  )
}
