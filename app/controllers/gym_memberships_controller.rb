class GymMembershipsController < ApplicationController

    def create(gym_membership_params)
        membership = Gym_membership.create(gym_membership_params)
        render json: membership
    end


    private

    def gym_membership_params
        params.permit(:price, :user_id, :gym_id)
    end
end
