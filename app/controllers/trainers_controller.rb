require 'pry'

class TrainersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        trainers = Trainer.all
        render json: trainers
    end

    def show
        trainer = Trainer.find(params[:id])
        if trainer
            render json: trainer
        else 
            render json: {error: "Trainer not found"}, status: :not_found
        end
    end

    def create
        trainer = Trainer.create(trainer_params)
        if trainer.valid?
            render json: trainer, status: :created
        else
            render json: {errors: trainer.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        trainer = Trainer.find(params[:id])
        trainer.update!(trainer_params)
        render json: trainer
    rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def destroy
        trainer = Trainer.find(params[:id])
        trainer.destroy
        head :no_content
    end


    private 

    def trainer_params
        params.permit(:name, :bio, :email, :image_url, :gym_id)
    end
end
