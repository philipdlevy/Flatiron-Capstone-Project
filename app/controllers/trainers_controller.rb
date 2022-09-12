require 'pry'

class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer
    end

    def create
        # binding.pry
        # gym = Gym.find(params[:id])

        trainer = Trainer.create(trainer_params)
        render json: trainer, status: :created
    end

    def update
        trainer = Trainer.find(params[:id])
        trainer.update(trainer_params)
        redner json: trainer
    end

    def destroy
        trainer = Trainer.find(params[:id])
        trainer.destroy
        head :no_content
    end


    private 

    def trainer_params
        params.permit(:name, :bio, :email, :gym_id)
    end
end
