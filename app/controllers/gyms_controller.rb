class GymsController < ApplicationController

    def index
        gyms = Gym.all
        render json: gyms
    end

    def create
        gym = Gym.create(gym_params)
        render json: gym, status: :created
    end

    def update
        gym = Gym.find(params[:id])
        gym.update(gym_params)
        render json: gym
    end

    def destroy
        gym = Gym.find(params[:id])
        gym.destroy
        head :no_content
    end

    private

    def gym_params
        params.permit(:address, :phone_number)
    end
end
