require 'pry'

class GymMembershipsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        gym_memberships = GymMembership.all 
        render json: gym_memberships
    end

    def create
        membership = GymMembership.create!(gym_membership_params)
        render json: membership
    rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
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