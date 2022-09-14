require 'pry'

class TrainingAppointmentsController < ApplicationController

    def index
        training_appointments = TrainingAppointment.all
        render json: training_appointments
    end

    def show
        training_appointment = TrainingAppointment.find(params[:id])
        render json: training_appointment
    end

    def create 
        # binding.pry
        training_appointment = TrainingAppointment.create(training_appointment_params)
        render json: training_appointment, status: :created
    end

    def destroy
        training_appointment = TrainingAppointment.find(params[:id])
        training_appointment.destroy
        head :no_content
    end

    private

    def training_appointment_params
        params.permit(:date, :time, :user_id, :trainer_id)
    end
end












