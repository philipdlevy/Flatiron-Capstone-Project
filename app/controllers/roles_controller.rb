require 'pry'

class RolesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        roles = Role.all
        render json: roles
    end 

    def show
        role = Role.find(params[:id])
        if role
            render json: role
        else
            render json: {error: "Role not found"}, status: :not_found
        end
    end

    def create
        role = Role.create!(role_params)
        render json: role, status: :created
    rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def destroy
        role = Role.find(params[:id])
        role.destroy
        head :no_content
    end

    private

    def role_params
        params.permit(:name)
    end
end
