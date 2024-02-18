(function (core) {
    class User {
        // Constructor
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        // Overridden methods
        toString() {
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
        }

        serialize()
        {
            if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        }

        deserialize(data)
        {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }

        toJSON() {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username,
                "Password": this.Password
            };
        }

        fromJSON(data) {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }
    }

    core.User = User;

})();
