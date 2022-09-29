class ExercisesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        exercises = Exercise.all
        render json: exercises
    end

    def show
        exercise = Exercise.find(params[:id])
        if exercise
            render json: exercise
        else
            render json: {error: "Exercise not found"}, status: :not_found
        end
    end

    def create 
        exercise = Exercise.create!(exercise_params)
        render json: exercise, status: :created
    rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def update 
        exercise = Exercise.find(params[:id])
        exercise.update!(exercise_params)
        render json: exercise
    rescue ActiveRecord::RecordInvalid => invalid 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def destroy
        exercise = Exercise.find(params[:id])
        exercise.destroy
        head :no_content
    end


    private

    def exercise_params
        params.permit(:name, :info, :image_url)
    end
end
