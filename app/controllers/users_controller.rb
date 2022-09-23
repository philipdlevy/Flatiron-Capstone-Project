require 'pry'

class UsersController < ApplicationController

    def index
        # binding.pry
        users = User.all
        render json: users
    end

    def show
        # When looking at a single user on localhost3000, 
        # only gets the user who is signed in or was. fix this
        # binding.pry
        user = User.find_by(id: session[:user_id])
        render json: user
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
        # binding.pry
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
