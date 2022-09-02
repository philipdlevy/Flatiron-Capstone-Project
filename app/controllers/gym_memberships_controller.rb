class GymMembershipsController < ApplicationController

    def index
        
    end

    def show

    end

    def create(gym_membership_params)

    end

    def destroy

    end


    private

    def gym_membership_params
        params.permit(:price)
    end
end
