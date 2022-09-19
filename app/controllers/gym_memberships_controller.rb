require 'pry'

class GymMembershipsController < ApplicationController

    def index
        gym_memberships = GymMembership.all 
        render json: gym_memberships
    end

    def create
        # binding.pry
        membership = GymMembership.create(gym_membership_params)
        render json: membership
    end

    def destroy
        membership = GymMembership.find(params[:id])
        membership.destroy
        head :no_content
    end


    private

    def gym_membership_params
        params.permit(:price, :membershipType, :user_id, :gym_id)
    end
end