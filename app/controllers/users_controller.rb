require 'pry'

class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def show
        # user = User.find_by(id: session[:user_id])
        user = User.find(params[:id])
        if user
            render json: user
        else
            render json: {error: "Not Authorized"}, status: :unauthorized
        end
    end

    def create
        # binding.pry
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end


    private

    def user_params
        # params.require(:newUser).permit(:username, :password, :age, :email, :address, :role_id)
        params.permit(:username, :password, :age, :email, :address, :role_id)
    end
end
