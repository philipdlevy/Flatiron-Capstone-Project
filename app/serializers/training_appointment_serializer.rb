require 'pry'

class TrainingAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :date_time, :trainer

  # belongs_to :user
  belongs_to :trainer

  def trainer
    # binding.pry
    trainer = Trainer.find(self.object.trainer_id)
    {id: trainer.id, name: trainer.name}
  end
end
