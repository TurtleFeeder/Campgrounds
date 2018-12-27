class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email

  def full_name
    self.object.first_name + ' ' + self.object.last_name
  end

end
