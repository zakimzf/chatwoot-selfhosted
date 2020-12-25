class AddResolvedToContacts < ActiveRecord::Migration[6.0]
  def up
    add_column :contacts, :resolved, :boolean, default: false

    update_resolved_in_contacts
  end

  def down
    remove_column :contacts, :resolved
  end

  private

  def update_resolved_in_contacts
    ::Contact.find_in_batches do |contacts_batch|
      Rails.logger.info "Migrated till #{contacts_batch.first.id}\n"
      contacts_batch.each do |contact|
        # rubocop:disable Rails/SkipsModelValidations
        contact.update_columns(additional_attributes: {}) if contact.additional_attributes.nil?

        if contact.email.present? || contact.phone_number.present? || contact.additional_attributes['screen_name'].present?
          contact.update_columns(resolved: true)
        end
        # rubocop:enable Rails/SkipsModelValidations
      end
    end
  end
end
