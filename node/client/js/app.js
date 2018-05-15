
class EventManager {
    constructor() {

     /*   $(".calendario").fullCalendar({
      defaultDate: '2018-05-12',
     editable: true,
     eventLimit: true, // allow "more" link when too many events
      
   });*/
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        //let url = this.urlBase + "/all"
        let url = "/all"
        $.get(url, (response) => {
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        //$.post('/events/delete/'+eventId, {id: eventId}, (response) => {
        $.post('/delete', {id: eventId}, (response) => {
            alert(response)
        })

    }

    guardarEvento() {

        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            //let nombre = $('#titulo').val(),
            let start = $('#start_date').val(),
                title = $('#titulo').val(),
                end = '',
                start_hour = '',
                end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            //let url = this.urlBase + "/new"
            let url = '/new'
            if (title != "" && start != "") {
                let ev = {
                    id : Math.floor(Math.random() * 50),
                    title: title,
                    start: start,
                   // end: end
                }
                
                $.post(url, ev, (response) => {
                    alert(response)
                })
                $('.calendario').fullCalendar('renderEvent', ev)

                console.log(ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }


    actualizarEvento(evento) {

       let id = evento.id
       let start = evento.start
        console.log("id "+id+ "fecha "+moment(evento.start).format()) 

        
        $.post('/update', {id: id , start : moment(evento.start).format() }, (response) => {
            alert(response)
        })

        

    }



    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        console.log(eventos)

        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2018-05-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
               this.actualizarEvento(event)
            },

            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "../img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                    console.log("desde app.js   "+event.id)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
