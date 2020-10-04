import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.4.0-M1"
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
	kotlin("jvm") version "1.3.72"
	kotlin("plugin.spring") version "1.3.72"
}

group = "x.museum"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
	maven { url = uri("https://repo.spring.io/snapshot") }
}

extra["springCloudVersion"] = "2020.0.0-SNAPSHOT"

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-data-mongodb-reactive")
	implementation("org.springframework.boot:spring-boot-starter-hateoas")
	implementation("org.springframework.boot:spring-boot-starter-security")
//	implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
//	implementation("org.springframework.cloud:spring-cloud-starter-oauth2")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
	implementation("io.github.microutils:kotlin-logging:1.8.3")
	implementation("org.springframework.cloud:spring-cloud-starter-consul-discovery")


//	implementation("org.springframework.cloud:spring-cloud-starter-config")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.projectreactor:reactor-test")
	testImplementation("org.springframework.security:spring-security-test")
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {

	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

// ONLY FOR DEVELOPING, REMOVE FOR PRODUCTION
// this adds truststore path, before the configuration from cloud config server is loaded
// https://docs.gradle.org/current/userguide/task_configuration_avoidance.html
tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
	jvmArgs = ArrayList(jvmArgs).apply {
		add("-Dspring.profiles.active=dev")
//		add("-Dspring.config.location=classpath:/bootstrap.yml,classpath:/application.yml,classpath:/application-dev.yml")
		add("-Djavax.net.ssl.trustStore=${System.getProperty("user.dir")}/src/main/resources/truststore.p12")
		add("-Djavax.net.ssl.trustStorePassword=Admin123")
	}
}



task("last") {

doLast {
	println("LAST:")
	println(System.out.print(System.getProperty("javax.net.ssl.trustStore")))     }

}