import { Component, ViewChild } from '@angular/core';
import { DxSchedulerModule,
         DxSchedulerComponent,
         DxButtonModule,
         DxTemplateModule } from 'devextreme-angular';
import { Service, MovieData, TheatreData, Data } from './app.service';
import Query from 'devextreme/data/query';

@Component({
 styleUrls: [ 'app.component.css' ],
  selector: 'demo-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    data: Data[];
    currentDate: Date = new Date(2015, 4, 25);
    moviesData: MovieData[];
    theatreData: TheatreData[];

    constructor(service: Service) {
        this.data = service.getData();
        this.moviesData = service.getMoviesData();
        this.theatreData = service.getTheatreData();
    }

    onAppointmentFormCreated(data) {
        var that = this,
            form = data.form,
            movieInfo = that.getMovieById(data.appointmentData.movieId) || {},
            startDate = data.appointmentData.startDate;

        form.option("items", [{
            label: {
                text: "Movie"
            },
            editorType: "dxSelectBox",
            dataField: "movieId",
            editorOptions: {
                items: that.moviesData,
                displayExpr: "text",
                valueExpr: "id",
                onValueChanged: function(args) {
                    movieInfo = that.getMovieById(args.value);
                    form.getEditor("director")
                        .option("value", movieInfo.director);
                    form.getEditor("endDate")
                        .option("value", new Date (startDate.getTime() + 60 * 1000 * movieInfo.duration));
                }.bind(this)
            }
        }, {
            label: {
                text: "Director"
            },
            name: "director",
            editorType: "dxTextBox",
            editorOptions: {
                value: movieInfo.director,
                readOnly: true
            }
        }, {
            dataField: "startDate",
            editorType: "dxDateBox",
            editorOptions: {
                width: "100%",
                type: "datetime",
                onValueChanged: function(args) {
                    startDate = args.value;
                    form.getEditor("endDate")
                        .option("value", new Date (startDate.getTime() + 60 * 1000 * movieInfo.duration));
                }
            }
        }, {
            name: "endDate",
            dataField: "endDate",
            editorType: "dxDateBox",
            editorOptions: {
                width: "100%",
                type: "datetime",
                readOnly: true
            }
        }, {
            dataField: "price",
            editorType: "dxRadioGroup",
            editorOptions: {
                dataSource: [5, 10, 15, 20],
                itemTemplate: function(itemData) {
                    return "$" + itemData;
                }
            }
        }]);
    }

    editDetails(showtime) {
        this.scheduler.instance.showAppointmentPopup(this.getDataObj(showtime), false);
    }

    getDataObj(objData) {
        for(var i = 0; i < this.data.length; i++) {
            if(this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].theatreId === objData.theatreId)
                return this.data[i];
        }
        return null;
    }

    getMovieById(id) {
        return Query(this.moviesData).filter(["id", "=", id]).toArray()[0];
    } 
}