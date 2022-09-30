require 'pry'

class TrainingAppointmentsController < ApplicationController

    def index
        # binding.pry
        training_appointments = TrainingAppointment.all
        render json: training_appointments
    end

    def show
        training_appointment = TrainingAppointment.find(params[:id])
        if training_appointment
            render json: training_appointment
        else
            render json: {error: "Training_appointment not found"}, status: not_found
        end
    end

    def create 
        binding.pry
        training_appointment = TrainingAppointment.create!(training_appointment_params)
        render json: training_appointment, status: :created
    rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def destroy
        training_appointment = TrainingAppointment.find(params[:id])
        training_appointment.destroy
        head :no_content
    end

    private

    def training_appointment_params
        params.require(:training_appointment).permit(:date, :time, :user_id, :trainer_id)
    end
end












