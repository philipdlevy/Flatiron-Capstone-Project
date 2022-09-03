require 'pry'

class RolesController < ApplicationController

    def index 
        # binding.pry
        roles = Role.all
        render json: roles
    end 

    def show
        role = Role.find(params[:id])
        render json: role
    end

    def create
        # binding.pry
        role = Role.create(role_params)
        render json: role, status: :created
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
