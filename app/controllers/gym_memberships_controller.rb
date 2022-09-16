require 'pry'

class GymMembershipsController < ApplicationController

    def index
        gym_memberships = GymMembership.all 
        render json: gym_memberships
    end

    def create(gym_membership_params)
        binding.pry
        membership = Gym_membership.create(gym_membership_params)
        render json: membership
    end


    private

    def gym_membership_params
        params.permit(:price, :user_id, :gym_id)
    end
end
